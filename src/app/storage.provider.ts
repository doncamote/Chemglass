// src/app/storage.provider.ts
import { Storage } from '@ionic/storage-angular';
import { makeEnvironmentProviders } from '@angular/core';

export function provideStorage() {
  return makeEnvironmentProviders([
    {
      provide: Storage,
      useFactory: () => {
        const storage = new Storage({
          name: '__chemglassdb',
          driverOrder: ['indexeddb', 'sqlite', 'websql']
        });
        return storage.create().then(() => storage);
      }
    }
  ]);
}
