class NoteMailer < ApplicationMailer
    def new_note_email(admins_associated, note_content, job_associated)
      @note_content = note_content
      @job_associated = job_associated
  
      admins_associated.each do |admin|
        @admin = admin
        puts "Sending email to #{admin.email}..."
        mail(to: admin.email, subject: "New note on job #{job_associated.address}")
      end
    end
  end