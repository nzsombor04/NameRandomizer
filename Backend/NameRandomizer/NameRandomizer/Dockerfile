FROM mcr.microsoft.com/dotnet/aspnet:8.0-bookworm-slim AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0-bookworm-slim AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["NameRandomizer/NameRandomizer.csproj", "NameRandomizer/"]
COPY ["Entites/Entites.csproj", "Entites/"]
COPY ["Data/Data.csproj", "Data/"]
COPY ["Logic/Logic.csproj", "Logic/"]
RUN dotnet restore "NameRandomizer/NameRandomizer.csproj"
COPY . .
WORKDIR "/src/NameRandomizer"
RUN dotnet build "./NameRandomizer.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./NameRandomizer.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "NameRandomizer.dll"]
