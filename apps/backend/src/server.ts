import { connectDatabase } from "./config"
import { app } from "./app"

const PORT: number = 3000

async function bootstrap() {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

bootstrap();