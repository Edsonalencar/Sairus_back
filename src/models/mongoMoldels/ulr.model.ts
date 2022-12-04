import { prop, getModelForClass } from "@typegoose/typegoose";

class ModelSairus {
  @prop({ required: true })
  public hash?: string;

  @prop({ required: true })
  public email?: string;

  @prop({ required: true })
  public password?: string;

  @prop({
    required: true,
    default: {
      nome: "",
      nome_social: "",
      data_nascimento: "",
      idade: null,
      sexo: "",
      telefone: "",
      telefone_emergencia: "",
      cpf: "",
    },
  })
  public dados_pessoais?: {
    nome: string;
    nome_social: string;
    data_nascimento: string;
    idade: number;
    sexo: string;
    telefone: string;
    telefone_emergencia: string;
    cpf: string;
  };

  @prop({
    required: true,
    default: {
      cns: "",
      tipo_sanguineo: "",
      alergia_medicamentos: [],
      medicamentos_uso: [],
      gestante: null,
      gestacao_risco: null,
      peso: 0.0,
      comorbidades: [],
    },
  })
  public dados_saude?: {
    cns: string;
    tipo_sanguineo: string;
    alergia_medicamentos: string[];
    medicamentos_uso: string[];
    gestante: boolean;
    gestacao_risco: boolean;
    peso: string;
    comorbidades: string[];
  };

  @prop({
    required: true,
    default: {
      cep: "",
      endereco: "",
      bairro: "",
      cidade: "",
      estado: "",
    },
  })
  public dados_endereco?: {
    cep: string;
    endereco: string;
    bairro: string;
    cidade: string;
    estado: boolean;
  };
}

export const MongoModelURL = getModelForClass(ModelSairus);
