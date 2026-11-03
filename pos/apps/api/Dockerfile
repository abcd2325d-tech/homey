FROM node:22-alpine AS build
WORKDIR /repo
COPY package.json ./
COPY apps/api/package.json apps/api/package.json
COPY packages/shared/package.json packages/shared/package.json
RUN npm install
COPY apps/api apps/api
COPY packages/shared packages/shared
WORKDIR /repo/apps/api
ENV DATABASE_PROVIDER=postgresql
RUN npm run db:select && npx prisma generate --schema prisma/schema.prisma
RUN npm run build

# The final stage keeps the same /repo/apps/api + /repo/packages/shared
# layout as the build stage: node_modules/@pos/shared is an npm workspace
# symlink pointing at ../../packages/shared, so packages/shared has to exist
# at that same relative path here too, or the import breaks at runtime.
FROM node:22-alpine
WORKDIR /repo/apps/api
ENV NODE_ENV=production
COPY --from=build /repo/node_modules /repo/node_modules
COPY --from=build /repo/packages/shared /repo/packages/shared
COPY --from=build /repo/apps/api/dist ./dist
COPY --from=build /repo/apps/api/prisma ./prisma
COPY --from=build /repo/apps/api/package.json ./package.json
EXPOSE 4000
CMD ["sh", "-c", "npx prisma migrate deploy --schema prisma/schema.prisma && node dist/server.js"]
