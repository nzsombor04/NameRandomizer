# Base image a runtime-hoz
FROM mcr.microsoft.com/dotnet/aspnet:8.0-bookworm-slim AS base
WORKDIR /app
EXPOSE 8080

# SDK image a buildhez
FROM mcr.microsoft.com/dotnet/sdk:8.0-bookworm-slim AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# COPY minden csproj a megfelelő helyre
COPY ["Backend/NameRandomizer/NameRandomizer/NameRandomizer.csproj", "NameRandomizer/NameRandomizer/"]
COPY ["Backend/NameRandomizer/Entites/Entites.csproj", "NameRandomizer/Entites/"]
COPY ["Backend/NameRandomizer/Logic/Logic.csproj", "NameRandomizer/Logic/"]
COPY ["Backend/NameRandomizer/Data/Data.csproj", "NameRandomizer/Data/"]

# Restore a NameRandomizer projektre
WORKDIR /src/NameRandomizer/NameRandomizer
RUN dotnet restore "NameRandomizer.csproj"

# Minden forrás bemásolása
COPY Backend/NameRandomizer/ ./NameRandomizer/

# Build
RUN dotnet build "NameRandomizer.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Publish
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "NameRandomizer.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Final image
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "NameRandomizer.dll"]
