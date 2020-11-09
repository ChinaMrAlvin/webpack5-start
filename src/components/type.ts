export default interface HelloDataType {
  id: number,
  avatar: string,
  name: string,
  phone: string | number,
  email: string
}

export interface ChartType {
  time: string | number,
  value: string | number
}
