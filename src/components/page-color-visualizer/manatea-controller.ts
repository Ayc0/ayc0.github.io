import type { ReactiveController, ReactiveControllerHost } from "lit";

import type { Tea, Cup, Waiter } from "manatea";

export class ManateaController<
  FlavoredTea extends Tea,
  UnflavoredTea extends Tea = FlavoredTea,
> implements ReactiveController
{
  private host: ReactiveControllerHost;
  cup: Cup<FlavoredTea, UnflavoredTea>;
  private listener: Waiter;

  constructor(
    host: ReactiveControllerHost,
    cup: Cup<FlavoredTea, UnflavoredTea>,
  ) {
    this.host = host;
    host.addController(this);

    this.cup = cup;

    // Update base component
    this.listener = cup.on(() => this.host.requestUpdate());
  }

  hostDisconnected() {
    // disconnect listener
    this.listener();
  }
}
