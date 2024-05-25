class User {
  #id?: number;
  name: string | null;
  email: string | null;
  birthdate: string | null;
  #status?: 1 | 0;
  #createdate?: string;

  constructor() {
    this.name = null;
    this.email = null;
    this.birthdate = null;
  }

  get id() {
    return this.#id;
  }

  get status() {
    return this.#status;
  }

  get createdate() {
    return this.#createdate;
  }
}
export default User;
