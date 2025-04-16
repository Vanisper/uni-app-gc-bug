import type { DefineComponent } from "vue";

declare module "vue" {
    interface GlobalComponents {
        CustomGCDemo: DefineComponent<{ demo: string }>
    }
}
