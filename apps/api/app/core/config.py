from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """App configuration, loaded from environment variables / a local .env file.

    We use pydantic-settings so every config value is typed and validated at
    startup, instead of scattering `os.environ.get(...)` calls around the code.
    """

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    environment: str = "local"
    database_url: str = "postgresql+psycopg://rephrase:rephrase@localhost:5432/rephrase"

    cognito_user_pool_id: str = ""
    cognito_app_client_id: str = ""
    cognito_region: str = "eu-west-2"


settings = Settings()
