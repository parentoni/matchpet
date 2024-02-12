/**
 * GetAllUsersDTO 
 * Data transfer object for get all users usecase
 * skip = number of users to skip
 * size = number of users to return
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export type GetAllUsersDTO = {
  skip?: number,
  size?: number,
}
