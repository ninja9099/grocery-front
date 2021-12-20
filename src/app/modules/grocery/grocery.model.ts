export interface IGroceryListResponse {
  count: string;
  next: string;
  previous: string;
  results: IGroceryListResults []
}

export interface IGroceryListResults {
  id: string;
  name: string;
  created_ts: string;
  updated_ts: string;
  status: string;
  due_date: string;
  reminder_interval: string;
  _order: number;
  created_by: string;
  updated_by: string;
  user: number;
}
export interface IGroceryListItem {
  id: number,
  created_ts: string,
  updated_ts: string,
  name: string,
  quantity: number,
  unit_of_measure: string,
  status: string,
  created_by: string,
  updated_by: string,
  grocery_list: string,
}
