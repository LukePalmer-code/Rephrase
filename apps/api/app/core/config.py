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

    openai_api_key: str = ""
    # Cheap models by default (student-budget friendly per the cost management plan).
    openai_chat_model: str = "gpt-4o-mini"
    openai_embedding_model: str = "text-embedding-3-small"
    openai_whisper_model: str = "whisper-1"


settings = Settings()
