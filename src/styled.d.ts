import "styled-components";

declare module "styled-components" {
  export interface Theme {
    textColor: string;
    bgColor: string;
    accentColor: string;
  }
}
