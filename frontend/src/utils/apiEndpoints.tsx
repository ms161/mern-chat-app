export default class ApiEndPoints{
  public static baseUrl= 'http://localhost:5000'
  public static readonly SIGNUP = { api: () => `${this.baseUrl}/live-talk/api/v1/users/signup` }
  public static readonly LOGIN = { api: () => `${this.baseUrl}/live-talk/api/v1/users/login` }
}