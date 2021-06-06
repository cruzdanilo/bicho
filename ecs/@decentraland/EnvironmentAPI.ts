import { DecentralandInterface } from 'decentraland-ecs';

declare const dcl: DecentralandInterface;

const handle = dcl.loadModule('EnvironmentAPI').then(({ rpcHandle }) => rpcHandle);

export const isPreviewMode = async () => await dcl.callRpc(await handle,
  'isPreviewMode', []) as boolean;
