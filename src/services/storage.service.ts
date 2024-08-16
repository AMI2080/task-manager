import { EncryptStorage } from "encrypt-storage";

class StorageService {
  private readonly privateKey: string = "o5ikdW3n$aO!L";

  private storage: EncryptStorage;

  public constructor() {
    this.storage = new EncryptStorage(this.privateKey, {
      prefix: "@instance",
    });
  }

  public store(key: string, value: any): void {
    this.storage.setItem(key, value);
  }

  public getData(key: string): any {
    return this.storage.getItem(key);
  }
}

const storageService = new StorageService();

export default storageService;
