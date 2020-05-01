FROM mcr.microsoft.com/dotnet/core/sdk:3.1
COPY . /app

WORKDIR /app

RUN dotnet publish BetterPointingPoker.Server.Web --configuration Release --output  publish --runtime linux-x64 --self-contained

WORKDIR /app/publish

EXPOSE 5000

ENTRYPOINT ["dotnet", "BetterPointingPoker.Server.Web.dll"]

