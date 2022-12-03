import { prop, getModelForClass } from "@typegoose/typegoose";

class ModelUser {
  @prop({ required: true })
  public hash?: string;

  @prop({ required: true })
  public email?: string;

  @prop({ required: true })
  public password?: string;

  @prop({ required: true })
  public dados_pessoais?: [
    nome?: string,
    nome_social?: string,
    data_nascimento?: string,
    idade?: number,
    sexo?: string,
    telefone?: string,
    telefone_emergencia?: string,
    cpf?: string
  ];

  @prop({ required: true })
  public dados_saude?: [
    cns?: string,
    tipo_sanguineo?: string,
    alergia_medicamentos?: string,
    medicamentos_uso?: string,
    gestante?: boolean,
    gestacao_risco?: boolean,
    peso?: string,
    comorbidades?: string[]
  ];

  @prop({ required: true })
  public dados_endereco?: [
    cep?: string,
    endereco?: string,
    bairro?: string,
    cidade?: string,
    estado?: boolean
  ];
}

export const MongoModelURL = getModelForClass(ModelUser);
