export interface IOptionsFinishTransaction {
  rollback: boolean
}

export interface IDatabaseRepository {
  startTransaction: () => Promise<void>
  finishTransaction: (options?: IOptionsFinishTransaction) => Promise<void>
}
