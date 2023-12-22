class NoteMailer < ApplicationMailer
  default from: 'new.note.portal@gmail.com'

    def new_note_email(admins_associated, note_content, job_associated, door_associated)
      @note_content = note_content
      @job_associated = job_associated
      @door_associated = door_associated
      mail(to: admins_associated.map(&:email), subject: "New note on job #{job_associated.address}")
  
      admins_associated.each do |admin|
        @admin = admin
        puts "Sending email to #{admin.email}..."
        # mail(to: admin.email, subject: "New note on job #{job_associated.address}")
      end
    end
  end