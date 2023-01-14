﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using PetSearch.Repositories;

#nullable disable

namespace PetSearch.Migrations
{
    [DbContext(typeof(WebApplicationDbContext))]
    [Migration("20230114200613_Added nullable to city address")]
    partial class Addednullabletocityaddress
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.7")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("PetSearch.Models.Animal", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<int>("Age")
                        .HasColumnType("integer");

                    b.Property<string>("AnimalName")
                        .HasColumnType("text");

                    b.Property<string>("AnimalType")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("FileNames")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Gender")
                        .HasColumnType("integer");

                    b.Property<bool>("IsClosed")
                        .HasColumnType("boolean");

                    b.Property<string>("LostAddressCity")
                        .HasColumnType("text");

                    b.Property<string>("LostAddressFull")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("LostDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("LostGeoPosition")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("PostCreationDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.ToTable("Animal");

                    b.HasDiscriminator<string>("Discriminator").HasValue("Animal");
                });

            modelBuilder.Entity("PetSearch.Models.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Phone")
                        .HasColumnType("text");

                    b.Property<int>("Role")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("PetSearch.Models.UserAuth", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Login")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.ToTable("UsersAuth");
                });

            modelBuilder.Entity("PetSearch.Models.FoundAnimal", b =>
                {
                    b.HasBaseType("PetSearch.Models.Animal");

                    b.HasDiscriminator().HasValue("FoundAnimal");
                });

            modelBuilder.Entity("PetSearch.Models.LostAnimal", b =>
                {
                    b.HasBaseType("PetSearch.Models.Animal");

                    b.HasDiscriminator().HasValue("LostAnimal");
                });

            modelBuilder.Entity("PetSearch.Models.Animal", b =>
                {
                    b.OwnsOne("PetSearch.Models.Contacts", "Contacts", b1 =>
                        {
                            b1.Property<Guid>("AnimalId")
                                .HasColumnType("uuid");

                            b1.Property<string>("Email")
                                .HasColumnType("text");

                            b1.Property<string>("Name")
                                .IsRequired()
                                .HasColumnType("text");

                            b1.Property<string>("Phone")
                                .HasColumnType("text");

                            b1.Property<string>("Telegram")
                                .HasColumnType("text");

                            b1.Property<string>("Vk")
                                .HasColumnType("text");

                            b1.HasKey("AnimalId");

                            b1.ToTable("Animal");

                            b1.WithOwner()
                                .HasForeignKey("AnimalId");
                        });

                    b.Navigation("Contacts")
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
