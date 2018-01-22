using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace BackendAspNet.Migrations
{
    public partial class PostData_Text : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //ALTER TABLE "dbo"."PostData" ALTER COLUMN  "Data" TEXT NOT NULL;
            migrationBuilder.Sql("ALTER TABLE \"dbo\".\"PostData\" ALTER COLUMN \"Data\" TEXT NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            //ALTER TABLE "dbo"."PostData" ALTER COLUMN  "Data" NVARCHAR(max) NOT NULL;
            migrationBuilder.Sql("ALTER TABLE \"dbo\".\"PostData\" ALTER COLUMN \"Data\" NVARCHAR(max) NOT NULL;");
        }
    }
}
