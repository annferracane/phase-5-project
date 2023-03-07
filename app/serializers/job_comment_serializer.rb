class JobCommentSerializer < ActiveModel::Serializer
  attributes :id, :job_id, :comment, :user_id, :user_first_name, :user_profile_image
  
  belongs_to :user

  def user_first_name
    if self.object.user.profile.first_name
      self.object.user.profile.first_name
    else
      ""
    end
  end

  def user_profile_image
    if self.object.user.profile
      self.object.user.profile.image
    else
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3y6KF3tG1JFKYb5-pdMgdaHrfd9jZ_Crkaw&usqp=CAU" # revisit
    end
  end

end
