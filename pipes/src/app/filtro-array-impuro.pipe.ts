import { Pipe, PipeTransform } from '@angular/core';

import { FiltroArrayPipe } from './filtro-array.pipe';

@Pipe({
  name: 'filtroArrayImpuro',
  pure: false
})
// eslint-disable-next-line @angular-eslint/use-pipe-transform-interface
export class FiltroArrayImpuroPipe extends FiltroArrayPipe {


}
