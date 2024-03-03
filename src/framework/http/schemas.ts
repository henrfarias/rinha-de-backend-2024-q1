import S from 'fluent-json-schema'

export interface ClientParam {
  clientId: string
}

export const clientParamSchema = S.object()
  .prop('clientId', S.string().pattern(/^\d+$/))
  .required(['clientId'])

export interface ExecuteTransactionBody {
  valor: number
  tipo: 'c' | 'd'
  descricao: string
}

export const executeTransactionBodySchema = S.object()
  .prop('valor', S.integer().minimum(1))
  .prop('tipo', S.enum(['c', 'd']))
  .prop('descricao', S.string().minLength(1).maxLength(10))
  .required(['valor', 'tipo', 'descricao'])

export interface ExecuteTransactionReply {
  limite: number
  saldo: number
}
