# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# Creating Categories with the default information.

CATEGORIES = [{name: "Life Insurance"}, {name: "Vehicle"}, {name: "Medical and Health"}, {name: "Fire"}, {name: "Accident"}]
RELATIONS = [{ relation_type: 'Brother' }, { relation_type: 'Mother' }, { relation_type: 'Father' }, { relation_type: 'Sister' }, { relation_type: 'Son' }, { relation_type: 'Daughter' }, { relation_type: 'Grand-Mother' }, { relation_type: 'Grand-Father' }, { relation_type: 'Father-In-Law' }, { relation_type: 'Mother-In-Law'}]
COMPANIES = [{ name: 'allianzbajaj'}, { name: 'Bharti AXA'}, { name: 'Birla Sun Life'}]
COMPANYCATEGORY = [{company_id: 1,category_id: 1}, {company_id: 2,category_id: 2}, company_id: 3,category_id: 3]
PLANS = [{ name: 'Waiver of premium on 
total & permanent disability',company_category_id: 1}, { name: 'Life cover of Rs.1 Cr.
at just Rs.13.97* per day',company_category_id: 2}, { name: 'Additional Sum Assured with 
e-Accidental Death Benefit Rider',company_category_id: 3}, { name: 'Choice of recurring or 
immediate payout'}, { name: '98.29%# Claim 
Settlement Ratio​'} ]

puts "Start creating the required categories data for application."
CATEGORIES.each{ |categories| Category.find_or_create_by!(categories)}
puts "All the required categories data has been added successfully."

# puts "Start creating the required relations data for application."
# RELATIONS.each{ |relations| Relation.find_or_create_by!(relations)}
# puts "All the required relations data has been added successfully."

puts "Start creating the required Companies data for application."
COMPANIES.each{ |companies| Company.find_or_create_by!(companies)}
puts "All the required Companies data has been added successfully."

puts "Start creating the required CompanyCategory data for application."
COMPANYCATEGORY.each{ |companycategory| CompanyCategory.find_or_create_by!(companycategory)}
puts "All the required CompanyCategory data has been added successfully."

puts "Start creating the required Plans data for application."
PLANS.each{ |plans| Plan.find_or_create_by!(plans)}
puts "All the required Plans data has been added successfully."