class Api::MessagesController < ApplicationController
  before_action :set_group only: [:index]

  def index
    @messages = @group.messages.includes(:user)
    respond_to do |format|
      format.html
      format.json { @new_messages = @messages.where('id > ?', params[:id])}
    end
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end