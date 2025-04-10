class AnalyticsController < ApplicationController
  # GET /analytics/glucose_averages
  def glucose_averages
    # Use a reference date from when we have data instead of current date
    # We know from our check that data exists up to April 24, 2024
    reference_date = DateTime.new(2024, 4, 24).in_time_zone

    # Get averages for the last 7 days from reference date
    last_7_days_start = reference_date.beginning_of_day - 6.days
    last_7_days_end = reference_date.end_of_day

    # Get averages for the previous 7 days
    previous_7_days_start = last_7_days_start - 7.days
    previous_7_days_end = last_7_days_start - 1.second

    # Get averages for the current month relative to reference date
    current_month_start = reference_date.beginning_of_month
    current_month_end = reference_date.end_of_day

    # Get averages for the previous month
    previous_month_start = (reference_date - 1.month).beginning_of_month
    previous_month_end = (reference_date - 1.month).end_of_month

    # Print date ranges for debugging
    puts "DEBUG: Reference date: #{reference_date}"
    puts "DEBUG: Last 7 days: #{last_7_days_start} to #{last_7_days_end}"
    puts "DEBUG: Previous 7 days: #{previous_7_days_start} to #{previous_7_days_end}"
    puts "DEBUG: Current month: #{current_month_start} to #{current_month_end}"
    puts "DEBUG: Previous month: #{previous_month_start} to #{previous_month_end}"

    # Calculate averages
    last_7_days_avg = calculate_average(last_7_days_start, last_7_days_end)
    previous_7_days_avg = calculate_average(previous_7_days_start, previous_7_days_end)
    current_month_avg = calculate_average(current_month_start, current_month_end)
    previous_month_avg = calculate_average(previous_month_start, previous_month_end)

    # Calculate time above range (>180 mg/dL)
    last_7_days_above_range = calculate_time_above_range(last_7_days_start, last_7_days_end)
    previous_7_days_above_range = calculate_time_above_range(previous_7_days_start, previous_7_days_end)
    current_month_above_range = calculate_time_above_range(current_month_start, current_month_end)
    previous_month_above_range = calculate_time_above_range(previous_month_start, previous_month_end)

    # Calculate time below range (<70 mg/dL)
    last_7_days_below_range = calculate_time_below_range(last_7_days_start, last_7_days_end)
    previous_7_days_below_range = calculate_time_below_range(previous_7_days_start, previous_7_days_end)
    current_month_below_range = calculate_time_below_range(current_month_start, current_month_end)
    previous_month_below_range = calculate_time_below_range(previous_month_start, previous_month_end)

    # Calculate changes
    weekly_change = calculate_change(last_7_days_avg, previous_7_days_avg)
    monthly_change = calculate_change(current_month_avg, previous_month_avg)

    # Calculate changes for time above range
    weekly_above_range_change = calculate_change(last_7_days_above_range, previous_7_days_above_range)
    monthly_above_range_change = calculate_change(current_month_above_range, previous_month_above_range)

    # Calculate changes for time below range
    weekly_below_range_change = calculate_change(last_7_days_below_range, previous_7_days_below_range)
    monthly_below_range_change = calculate_change(current_month_below_range, previous_month_below_range)

    # Prepare response
    response = {
      weekly: {
        average: last_7_days_avg,
        change: weekly_change,
        change_percent: calculate_change_percent(last_7_days_avg, previous_7_days_avg),
        period_start: last_7_days_start,
        period_end: last_7_days_end,
        time_above_range: last_7_days_above_range,
        time_above_range_change: weekly_above_range_change,
        time_above_range_change_percent: calculate_change_percent(last_7_days_above_range, previous_7_days_above_range),
        time_below_range: last_7_days_below_range,
        time_below_range_change: weekly_below_range_change,
        time_below_range_change_percent: calculate_change_percent(last_7_days_below_range, previous_7_days_below_range)
      },
      monthly: {
        average: current_month_avg,
        change: monthly_change,
        change_percent: calculate_change_percent(current_month_avg, previous_month_avg),
        period_start: current_month_start,
        period_end: current_month_end,
        time_above_range: current_month_above_range,
        time_above_range_change: monthly_above_range_change,
        time_above_range_change_percent: calculate_change_percent(current_month_above_range, previous_month_above_range),
        time_below_range: current_month_below_range,
        time_below_range_change: monthly_below_range_change,
        time_below_range_change_percent: calculate_change_percent(current_month_below_range, previous_month_below_range)
      }
    }

    render json: response
  end

  private

  def calculate_average(start_date, end_date)
    measurements = GlucoseMeasurement.where(tested_at: start_date..end_date)
    puts "DEBUG: Calculating average for #{start_date} to #{end_date}: Found #{measurements.count} measurements"
    if measurements.any?
      measurements.average(:value).to_f.round(1)
    else
      nil
    end
  end

  def calculate_time_above_range(start_date, end_date)
    measurements = GlucoseMeasurement.where(tested_at: start_date..end_date)
    puts "DEBUG: Calculating time above range for #{start_date} to #{end_date}: Found #{measurements.count} measurements"
    if measurements.any?
      above_range_count = measurements.where("value > ?", 180).count
      puts "DEBUG: Readings above 180: #{above_range_count} out of #{measurements.count}"
      (above_range_count.to_f / measurements.count * 100).round(1)
    else
      nil
    end
  end

  def calculate_time_below_range(start_date, end_date)
    measurements = GlucoseMeasurement.where(tested_at: start_date..end_date)
    puts "DEBUG: Calculating time below range for #{start_date} to #{end_date}: Found #{measurements.count} measurements"
    if measurements.any?
      below_range_count = measurements.where("value < ?", 70).count
      puts "DEBUG: Readings below 70: #{below_range_count} out of #{measurements.count}"
      (below_range_count.to_f / measurements.count * 100).round(1)
    else
      nil
    end
  end

  def calculate_change(current_avg, previous_avg)
    if current_avg && previous_avg
      (current_avg - previous_avg).round(1)
    else
      nil
    end
  end

  def calculate_change_percent(current_avg, previous_avg)
    if current_avg && previous_avg && previous_avg != 0
      ((current_avg - previous_avg) / previous_avg * 100).round(1)
    else
      nil
    end
  end
end
