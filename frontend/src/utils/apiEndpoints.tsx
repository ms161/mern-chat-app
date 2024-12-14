export default class ApiEndPoints{
 
  public static readonly SIGNUP = { api: () => `/live-talk/api/v1/users/signup` }
  public static readonly LOGIN = { api: () => `/live-talk/api/v1/users/login` }
  public static readonly GET_ALL_USERS = { api: () => `/live-talk/api/v1/users` }
  public static readonly GET_ONE_TO_ONE_CHAT = { api: () => `/live-talk/api/v1/chat/get-one-to-one-chat` }
  public static readonly SEND_CHAT = { api: () => `/live-talk/api/v1/chat/create-chat` }
  public static readonly GET_MY_GROUPS = { api: () => `/live-talk/api/v1/group/get-my-groups` }
}