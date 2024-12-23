import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

export const uploadimage = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.file) {
            res.status(400).json({ "message": "Nenhum arquivo enviado." });
            return;
        }

        const { vehicleId } = req.body;
        const file = req.file;
        const fileName = `${Date.now()}_${file.originalname}`;

        // Verificar se o veículo existe
        const { data: dataVehicle, error: errorVehicle } = await supabase
            .from('vehicles')
            .select('*')
            .eq('id', vehicleId)
            .single();

        if (errorVehicle || !dataVehicle) {
            res.status(404).json({ "message": "Veículo não encontrado." });
            return;
        }

        // Verificar se já existe uma imagem associada
        if (dataVehicle.image_url) {
            res.status(400).json({ "message": "O veículo já possui uma imagem. Remova a imagem atual antes de adicionar uma nova." });
            return;
        }

        // Fazer upload da imagem para o armazenamento
        const { data: uploadData, error: uploadError } = await supabase
            .storage
            .from('vehicle_images')
            .upload(fileName, file.buffer, {
                cacheControl: '3600',
                upsert: false,
            });

        if (uploadError) {
            res.status(500).json({ "message": "Erro ao fazer upload da imagem." });
            return;
        }

        // Obter a URL pública da imagem
        const { data: publicUrlData } = supabase
            .storage
            .from('vehicle_images')
            .getPublicUrl(fileName);

        if (!publicUrlData) {
            res.status(500).json({ "message": "Erro ao obter URL pública da imagem." });
            return;
        }

        // Atualizar a URL da imagem no veículo
        const { error: updateError } = await supabase
            .from('vehicles')
            .update({ image_url: publicUrlData.publicUrl })
            .eq('id', vehicleId);

        if (updateError) {
            console.log(updateError)
            res.status(500).json({ "message": "Erro ao atualizar o veículo com a URL da imagem." });
            return;
        }

        res.status(200).json({ publicUrl: publicUrlData.publicUrl });
    } catch (error) {
        console.error("Erro no servidor:", error);
        res.status(500).json({ "message": "Erro no servidor." });
    }
};

export const deleteImage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { imageUrl } = req.body;

        // Verificar se a URL foi fornecida
        if (!imageUrl) {
            res.status(400).json({ message: "A URL da imagem é obrigatória." });
            return;
        }

        // Extrair o nome do arquivo da URL
        const urlParts = imageUrl.split('/');
        const fileName = urlParts[urlParts.length - 1];

        // Verificar se conseguimos extrair o nome do arquivo
        if (!fileName) {
            res.status(400).json({ message: "Não foi possível extrair o nome do arquivo da URL." });
            return;
        }

        // Remover o arquivo no Supabase
        const { error } = await supabase
            .storage
            .from('vehicle_images')
            .remove([`${fileName}`]);
            console.log(fileName)
            console.log(error)

        if (error) {
            console.error("Erro ao remover a imagem:", error.message);
            res.status(500).json({ message: "Erro ao remover a imagem do Supabase." });
            return;
        }

        const { data, error: errorVehicle } = await supabase
            .from('vehicles') // Tabela em que o campo será atualizado
            .update({ image_url: null }) // Campo e novo valor
            .eq('image_url', imageUrl);

        res.status(200).json({ message: "Imagem removida com sucesso." });
    } catch (error) {
        console.error("Erro no servidor ao tentar remover a imagem:", error);
        res.status(500).json({ message: "Erro no servidor ao tentar remover a imagem." });
    }
};