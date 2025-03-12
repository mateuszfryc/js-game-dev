import { EntityTemplate } from '../entity';
import { clothing } from './clothing';
import { creatures } from './creatures';
import { furniture } from './furniture';
import { misc } from './misc';
import { plumbing } from './plumbing';
import { roomEquipment } from './room-equipment';
import { structures } from './structures';
import { weapons } from './weapons';

export const contentTemplates: EntityTemplate[] = [
  ...clothing,
  ...creatures,
  ...furniture,
  ...misc,
  ...structures,
  ...weapons,
  ...roomEquipment,
  ...plumbing,
];
