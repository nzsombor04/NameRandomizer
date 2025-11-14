FROM mcr.microsoft.com/dotnet/aspnet:8.0-bookworm-slim AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0-bookworm-slim AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# COPY a .csproj fájlokat a helyes útvonalból
COPY ["Backend/NameRandomizer/NameRandomizer.csproj", "NameRandomizer/"]
COPY ["Backend/Entites/Entites.csproj", "Entites/"]
COPY ["Backend/Data/Data.csproj", "Data/"]
COPY ["Backend/Logic/Logic.csproj", "Logic/"]

RUN dotnet restore "NameRandomizer/NameRandomizer.csproj"

# Minden többi forrás bemásolása
COPY Backend/ ./Backend/

WORKDIR "/src/Backend/NameRandomizer"
RUN dotnet build "./NameRandomizer.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./NameRandomizer.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "NameRandomizer.dll"]
