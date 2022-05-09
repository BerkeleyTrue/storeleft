export interface OperationResult {
  data?: any;
  isFetching: boolean;
  error?: InstanceType<typeof Error>
}
