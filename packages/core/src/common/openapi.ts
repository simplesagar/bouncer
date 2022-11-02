import { toOpenApi, bearerAuthScheme } from "@zodios/openapi";
import { merge, isErrorResult } from "openapi-merge";
import type { Swagger } from "atlassian-openapi";
import { seatsApi } from "./seats";
import { subscriptionApi } from "./subscriptions";
import { configApi } from "./config";

const securityScheme = bearerAuthScheme();

const configOAS = toOpenApi(configApi, {
  info: {
    title: "Bouncer API",
    version: "1.0.0",
    description: "SaaS seat management API",
  },
  servers: [
    {
      url: "/api/v1", // base path of user api
    },
  ],
  securityScheme,
});

const seatsOAS = toOpenApi(seatsApi, {
  info: {
    title: "Bouncer API",
    version: "1.0.0",
    description: "SaaS seat management API",
  },
  servers: [
    {
      url: "/api/v1", // base path of user api
    },
  ],
  securityScheme,
});

const subscriptionsOAS = toOpenApi(subscriptionApi, {
  info: {
    title: "Bouncer API",
    version: "1.0.0",
    description: "SaaS seat management API",
  },
  servers: [
    {
      url: "/api/v1", // base path of user api
    },
  ],
  securityScheme,
});

const mergedApi = merge([
  {
    oas: configOAS as any,
  },
  {
    oas: seatsOAS as any,
  },
  { oas: subscriptionsOAS },
]);

if (isErrorResult(mergedApi)) {
  throw new Error("cannot compile API definition");
}

export const apiDefinition: Swagger.SwaggerV3 = mergedApi.output;
