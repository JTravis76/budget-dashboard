/* Modal plugin
 * A set of simple function to control the modal display behavior.
 */
export const modal = {
  /** open the modal
   * @param id the element id
   */
  open(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.classList.add("is-active");
    }
  },
  /** cloase the modal
   * @param id the element id
   */
  close(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.classList.remove("is-active");
    }
  },
  /** toggle the state of a modal; open or close
   * @param id the element id
   */
  toggle(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.classList.toggle("is-active");
    }
  },
};

export default modal;