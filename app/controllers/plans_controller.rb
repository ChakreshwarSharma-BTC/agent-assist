class PlansController < ApplicationController
  before_action :authenticate_user!
  before_action :find_plan_by_id, only: [:show, :edit, :update, :destroy]

  
  def index
    @plans = Plan.all
  end

  def new
    @plan = Plan.new
  end

  def edit
  end

  def create
    #@plan = Plan.new(plan_params)
    @company_categories_id = CompanyCategory.where(company_id: params[:company_id], category_id: params[:category_id])
    @plan = Plan.new(plan_params.merge({company_categories_id: @company_categories_id.ids.uniq.first}))
    if @plan.save
        puts 'Save'
      else
        puts 'Error'
      end
      redirect_to plans_path
  end

  def delete
  end

  def destroy
     if @plan.destroy
      puts 'Delete'
    else
      puts 'error'
    end
    redirect_to plans_path
  end

  def show
  end

  def update
    if @plan.update(plan_params)
      puts 'Updated'
    else
      puts 'Error'
    end
    redirect_to plans_path
  end

  private 

  def find_plan_by_id
    @plan = Plan.find(params[:id])
  end

  def plan_params
    params.require(:plan).permit(:name, :company_id, :category_id)
  end
end
