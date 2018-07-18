from surprise import SVD
from surprise import Dataset, KNNBasic
from surprise.model_selection import cross_validate

# Load the movielens-100k dataset (download it if needed).
data = Dataset.load_builtin('ml-100k')

# # Use the famous SVD algorithm.
# algo = SVD()

# # Run 5-fold cross-validation and print results.
# cross_validate(algo, data, measures=['RMSE', 'MAE'], cv=5, verbose=True)
train = data.build_full_trainset()
sim_options = {'name': 'cosine',
               'user_based': False  # compute  similarities between items
               }
algo = KNNBasic(sim_options=sim_options)

algo.fit(train)

uid = '196'
iid = '242'

pred = algo.predict(uid=uid, iid=iid, r_ui=0, verbose=True)

print(pred)


# path to dataset folder
files_dir = os.path.expanduser('~/.surprise_data/ml-100k/ml-100k/')

# This time, we'll use the built-in reader.
reader = Reader('ml-100k')

# folds_files is a list of tuples containing file paths:
# [(u1.base, u1.test), (u2.base, u2.test), ... (u5.base, u5.test)]
train_file = files_dir + 'u%d.base'
test_file = files_dir + 'u%d.test'
folds_files = [(train_file % i, test_file % i) for i in [1]]

data = Dataset.load_from_folds(folds_files, reader=reader)
pkf = PredefinedKFold()

sim_options = {'name': 'cosine',
               'user_based': True  # compute  similarities between items
               }

algo = KNNBasic(sim_options=sim_options)

for trainset, testset in pkf.split(data):

    # train and test algorithm.
    algo.fit(trainset)
    predictions = algo.test(testset)

    # Compute and print Root Mean Squared Error
    accuracy.rmse(predictions, verbose=True)