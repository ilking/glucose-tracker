class GlucoseMeasurementsController < ApplicationController
  before_action :set_glucose_measurement, only: [ :show, :edit, :update, :destroy ]

  # GET /glucose_measurements
  def index
    @glucose_measurements = GlucoseMeasurement.order(updated_at: :desc)
    respond_to do |format|
      format.html
      format.json { render json: @glucose_measurements }
    end
  end

  # GET /glucose_measurements/1
  def show
    respond_to do |format|
      format.html
      format.json { render json: @glucose_measurement }
    end
  end

  # GET /glucose_measurements/new
  def new
    @glucose_measurement = GlucoseMeasurement.new
  end

  # GET /glucose_measurements/1/edit
  def edit
  end

  # POST /glucose_measurements
  def create
    @glucose_measurement = GlucoseMeasurement.new(glucose_measurement_params)

    respond_to do |format|
      if @glucose_measurement.save
        format.html { redirect_to @glucose_measurement, notice: "Glucose measurement was successfully created." }
        format.json { render json: @glucose_measurement, status: :created }
      else
        format.html { render :new }
        format.json { render json: @glucose_measurement.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /glucose_measurements/1
  def update
    respond_to do |format|
      if @glucose_measurement.update(glucose_measurement_params)
        format.html { redirect_to @glucose_measurement, notice: "Glucose measurement was successfully updated." }
        format.json { render json: @glucose_measurement, status: :ok }
      else
        format.html { render :edit }
        format.json { render json: @glucose_measurement.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /glucose_measurements/1
  def destroy
    @glucose_measurement.destroy
    respond_to do |format|
      format.html { redirect_to glucose_measurements_url, notice: "Glucose measurement was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_glucose_measurement
      @glucose_measurement = GlucoseMeasurement.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def glucose_measurement_params
      params.require(:glucose_measurement).permit(:user_id, :value, :tested_at, :tz_offset)
    end
end
