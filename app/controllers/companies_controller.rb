class CompaniesController < ApplicationController

  before_action :authenticate_user!
  before_action :find_company_by_id, only: [:show, :edit, :update, :destroy]

  def new
    @company = Company.new
  end

  def index
    @companies = Company.all
  end

  def create
    @company = Company.new(company_params)
    if @company.save
      flash[:success] = t('.success')
    else
      flash[:error] = t('.error')
    end
    redirect_to companies_path
  end

  def edit
  end

  def update
     if @company.update(company_params)
      flash[:success] = t('.success')
    else
      flash[:error] = t('.error')
    end
    redirect_to companies_path
  end

  def destroy
     if @company.destroy
      flash[:success] = t('.success')
    else
      flash[:error] = t('.error')
    end
    redirect_to companies_path
  end

  private

  def find_company_by_id
    @company = Company.find(params[:id])
  end

  def company_params
    params.require(:company).permit(:name)
  end
end