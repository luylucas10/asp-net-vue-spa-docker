#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM node:lts as node
WORKDIR /front-end
COPY src/AspNetDockerVue/vue-client-app .
RUN npm install && npm run build


FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["src/AspNetDockerVue/AspNetDockerVue.csproj", "src/AspNetDockerVue/"]
RUN dotnet restore "src/AspNetDockerVue/AspNetDockerVue.csproj"
COPY . .
WORKDIR "/src/src/AspNetDockerVue"
RUN dotnet build "AspNetDockerVue.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "AspNetDockerVue.csproj" -c Release -o /app/publish /p:UseAppHost=false
COPY --from=node ./front-end/dist /app/publish/wwwroot

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "AspNetDockerVue.dll"]