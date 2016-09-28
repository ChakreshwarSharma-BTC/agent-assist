# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# Creating Categories with the default information.

CATEGORIES = [{name: "Life Insurance"}, {name: "Vehicle"}, {name: "Medical and Health"}, {name: "Fire"}, {name: "Accident"}]

puts "Start creating the required categories data for application."
CATEGORIES.each{ |categories| Category.find_or_create_by!(categories)}
puts "All the required categories data has been added successfully."