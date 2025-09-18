# 🖼️ Image Converter - Backend

![Image Converter Homepage](./change.png)

## 🚀 Spring Boot Backend for Image Converter

This is the backend service for the Image Converter application, built with Spring Boot. It provides REST APIs for image conversion, user authentication with Google OAuth, and billing integration with Stripe.

## 📋 Prerequisites

### 🖥️ Windows Users
- **Java 17+** 📦
  - Download from [Oracle JDK](https://www.oracle.com/java/technologies/downloads/) or [OpenJDK](https://adoptium.net/)
  - Verify installation: `java --version`
- **Maven** 🔧
  - Download from [Apache Maven](https://maven.apache.org/download.cgi)
  - Add to PATH environment variable
  - Verify installation: `mvn --version`
- **Docker Desktop** 🐳
  - Download from [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/)
  - Enable WSL 2 backend if prompted
- **ImageMagick** 🎨
  - Download from [ImageMagick Windows](https://imagemagick.org/script/download.php#windows)
  - Make sure to check "Install development headers and libraries for C and C++" during installation

### 🍎 macOS Users
- **Java 17+** 📦
  ```bash
  # Using Homebrew
  brew install openjdk@17
  
  # Or download from Oracle/OpenJDK websites
  ```
- **Maven** 🔧
  ```bash
  # Using Homebrew
  brew install maven
  ```
- **Docker Desktop** 🐳
  - Download from [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop/)
- **ImageMagick** 🎨
  ```bash
  # Using Homebrew
  brew install imagemagick
  ```

## 🔧 Environment Setup

### 1. 📁 Clone the Repository
```bash
git clone https://github.com/raimonvibe/change-my-image.git
cd change-my-image/backend
```

### 2. 🗄️ Start PostgreSQL Database
```bash
# From the project root directory
cd ..
docker compose up -d
```

````bash
sudo apt install imagemagick libmagickwand-dev
```

### 3. 🔑 Set Environment Variables

#### 🖥️ Windows (Command Prompt)
```cmd
set DATABASE_URL=jdbc:postgresql://localhost:5432/imageconverter
set DATABASE_USERNAME=postgres
set DATABASE_PASSWORD=postgres
set GOOGLE_CLIENT_ID=your-google-oauth-client-id
set STRIPE_SECRET_KEY=sk_test_xxx
set STRIPE_PUBLISHABLE_KEY=pk_test_xxx
set STRIPE_WEBHOOK_SECRET=whsec_xxx
set PORT=8080
```

#### 🖥️ Windows (PowerShell)
```powershell
$env:DATABASE_URL="jdbc:postgresql://localhost:5432/imageconverter"
$env:DATABASE_USERNAME="postgres"
$env:DATABASE_PASSWORD="postgres"
$env:GOOGLE_CLIENT_ID="your-google-oauth-client-id"
$env:STRIPE_SECRET_KEY="sk_test_xxx"
$env:STRIPE_PUBLISHABLE_KEY="pk_test_xxx"
$env:STRIPE_WEBHOOK_SECRET="whsec_xxx"
$env:PORT="8080"
```

#### 🍎 macOS/Linux (Terminal)
```bash
export DATABASE_URL=jdbc:postgresql://localhost:5432/imageconverter
export DATABASE_USERNAME=postgres
export DATABASE_PASSWORD=postgres
export GOOGLE_CLIENT_ID=your-google-oauth-client-id
export STRIPE_SECRET_KEY=sk_test_xxx
export STRIPE_PUBLISHABLE_KEY=pk_test_xxx
export STRIPE_WEBHOOK_SECRET=whsec_xxx
export PORT=8080
```

## 🏃‍♂️ Running the Application

### 🖥️ Windows
```cmd
# Navigate to backend directory
cd backend

# Run with Maven
mvn spring-boot:run
```

### 🍎 macOS
```bash
# Navigate to backend directory
cd backend

# Run with Maven
mvn spring-boot:run
```

## ✅ Verification

Once the application starts successfully, you should see:
```
Started ImageConverterApplication in X.XXX seconds
Tomcat started on port 8080 (http) with context path '/'
```

### 🔍 Test the Backend
- **Health Check**: http://localhost:8080/health (should return "ok")
- **API Base URL**: http://localhost:8080

## 🏗️ Application Architecture

### 📦 Key Components
- **Controllers**: REST API endpoints for image conversion, billing, and user management
- **Services**: Business logic for image processing and user operations
- **Security**: Google OAuth integration and JWT token validation
- **Database**: PostgreSQL with JPA/Hibernate for data persistence
- **Image Processing**: ImageMagick integration for format conversion

### 🔌 API Endpoints
- `GET /health` - Health check endpoint
- `POST /api/convert` - Image conversion endpoint
- `POST /api/stripe/checkout` - Create Stripe checkout session
- `POST /api/stripe/webhook` - Stripe webhook handler
- `GET /api/user/credits` - Get user credit balance

## 🔐 Configuration

### 🌍 Environment Variables
| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection URL | ✅ |
| `DATABASE_USERNAME` | Database username | ✅ |
| `DATABASE_PASSWORD` | Database password | ✅ |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | ✅ |
| `STRIPE_SECRET_KEY` | Stripe secret key | ✅ |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | ✅ |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret | ⚠️ |
| `PORT` | Server port (default: 8080) | ❌ |

### 📝 Application Properties
The application uses `application.yml` for configuration with environment variable substitution.

## 🐛 Troubleshooting

### Common Issues

#### ❌ "Permission denied" for mvnw
**🖥️ Windows:**
```cmd
# Maven wrapper might not have execute permissions
# Use system Maven instead
mvn spring-boot:run
```

**🍎 macOS:**
```bash
# Fix permissions
chmod +x mvnw
./mvnw spring-boot:run
```

#### ❌ Database Connection Failed
- Ensure PostgreSQL is running: `docker ps`
- Check if port 5432 is available
- Verify environment variables are set correctly

#### ❌ ImageMagick Not Found
- **Windows**: Reinstall ImageMagick and ensure it's in PATH
- **macOS**: `brew reinstall imagemagick`

#### ❌ Maven Not Found
- **Windows**: Download and install Maven, add to PATH
- **macOS**: `brew install maven`

## 📚 Additional Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [ImageMagick Documentation](https://imagemagick.org/)
- [Stripe API Documentation](https://stripe.com/docs/api)
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

🎉 **Happy coding!** If you encounter any issues, please check the troubleshooting section or create an issue in the repository.
