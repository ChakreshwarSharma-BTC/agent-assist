class NomineesController < ApplicationController
before_action :authenticate_user!
before_action :find_nominee_by_id, only: [:show, :edit, :update, :destroy]

  def create
    @nominee = Nominee.new(nominee_params)
    if @nominee.save
      redirect_to policy_nominees_path
    else
      render :new
    end 
  end

  def new
    policy = Policy.find_by(params[:id])
    @nominee = policy.build_nominee
    @nominee.build_personal_info
  end

  def edit
  end

  def update
    if @nominee.update_attributes(nominee_params)
      redirect_to policy_nominees_path
    else
      redirect_to policy_nominees_path
    end
  end

  def show
  end

  def destroy
    if @nominee.destroy
      redirect_to policy_nominees_path
    end
  end

  def index
    @nominees = Nominee.all
  end

  private

  def find_nominee_by_id
    @nominee = Nominee.find(params[:id])
  end

  def nominee_params
    params.require(:nominee).permit(:relation, :policy_id, personal_info_attributes: [:first_name, :middle_name, :last_name, :date_of_birth, :gender])
  end
end