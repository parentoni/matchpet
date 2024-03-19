/**
 * 
 * @class TextUtils
 * @classdesc colection of text utils functions 
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export class TextUtils {
  public static sanitize(s: string): string {
    try {
      return s.replace(/\s/g, "").toLowerCase();
    } catch {
      return ''
    }
  }

  /**
   * Apply trim to a string, on error return empty string
   * @param {string} s - string to trim 
   *
   * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
   */
  public static trim(s:string):string {
    try {
      return s.trim()
    } catch {
      return ''
    }
  }
}
