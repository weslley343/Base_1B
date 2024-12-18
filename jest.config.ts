import { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {}], // Para compilar arquivos TS/TSX
  },
};

export default config;
