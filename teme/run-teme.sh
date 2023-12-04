

FOLDER=$1
SCRIPT="$(cd $FOLDER && ls -l | grep .*\.sh | grep -o '[^ ]\+$')"

# echo $FOLDER
# echo $SCRIPT

sh ./$FOLDER/$SCRIPT