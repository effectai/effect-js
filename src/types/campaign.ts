export interface Campaign {
  id: number,
  owner: Array<string>,
  content: {
    field_0: number,
    field_1: string,
  },
  reward: {
    quantity: string,
    contract: string,
  },
  qualis?: Array<{key: number, value: number}>,
  info?: {
    title: string,
    description: string,
    instructions: string,
    template: string,
    image: string,
    category: string,
    example_task: {
      image_url: string,
    },
    version: number,
    webhook: string,
    reward: string,
    estimated_time: string,
  }
}
