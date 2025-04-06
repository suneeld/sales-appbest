// src/utils/faroInit.js
import { matchRoutes } from 'react-router-dom';
import {
  initializeFaro,
  createReactRouterV6DataOptions,
  ReactIntegration,
  getWebInstrumentations,
} from '@grafana/faro-react';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';

let isFaroInitialized = false; // 🛡️ Prevent duplicate initialization

export const initFaro = () => {
  if (isFaroInitialized) {
    console.warn("Faro is already initialized.");
    return;
  }

  initializeFaro({
    url: 'https://faro-collector-prod-au-southeast-1.grafana.net/collect/ffeada76367f2c9ccdf21b78334cf831',
    app: {
      name: 'sales-appbest',
      version: '1.0.0',
      environment: 'production',
    },
    instrumentations: [
      ...getWebInstrumentations(),
      new TracingInstrumentation(),
      new ReactIntegration({
        router: createReactRouterV6DataOptions({
          matchRoutes,
        }),
      }),
    ],
  });

  isFaroInitialized = true; // ✅ Set flag once initialized
};
