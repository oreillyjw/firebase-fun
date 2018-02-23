export class Todo {
  $key : string;
  parentKey: string = null;
  userId: string;
  content: string = '';
  complete: boolean = false;
}
