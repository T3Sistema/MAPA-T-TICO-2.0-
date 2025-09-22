/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { Playground } from './playground';

document.addEventListener('DOMContentLoaded', async (event) => {
  const rootElement = document.querySelector('#root')! as HTMLElement;

  const playground = new Playground();
  rootElement.appendChild(playground);

  playground.renderMapQuery({ location: 'Maceió - Alagoas, Brazil' });
});
