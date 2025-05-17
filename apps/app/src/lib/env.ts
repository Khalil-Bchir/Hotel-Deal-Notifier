// Helper to validate environment variables
export function getEnvVariable(key: string, required = true): string {
  const value = process.env[key];
  if (!value && required) {
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value || '';
}

// Define environment variables
export const AMENDUS_API_URL = getEnvVariable('NEXT_PUBLIC_AMENDUS_API_URL');
export const AMENDUS_API_KEY = getEnvVariable('AMENDUS_API_KEY');
